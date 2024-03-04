using Microsoft.EntityFrameworkCore;
using Promact.CustomerSuccess.Platform.Entities;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.TenantManagement.EntityFrameworkCore;

namespace Promact.CustomerSuccess.Platform.Data;

public class PlatformDbContext : AbpDbContext<PlatformDbContext>
{
    public PlatformDbContext(DbContextOptions<PlatformDbContext> options)
        : base(options)
    {
    }

    public DbSet<Project> Projects { get; set; }
    public DbSet<Document> Documents { get; set; }
    public DbSet<DocumentVersion> DocumentVersions { get; set; }
    public DbSet<Organization> Organizations { get; set; }
    public DbSet<ClientFeedback> ClientFeedbacks { get; set; }
    public DbSet<ProjectBudget> ProjectBudgets { get; set; }
    public DbSet<VersionHistory> VersionHistory { get; set; }
    public DbSet<AuditHistory> AuditHistory { get; set; }
    public DbSet<ProjectDescription> ProjectDescription { get; set; }
    public DbSet<Scope> Scope { get; set; }
    public DbSet<ProjectStack> ProjectStack { get; set; }
    public DbSet<PhaseMilestone> PhaseMilestones { get; set; }
    public DbSet<ProjectResources> ProjectResources { get; set; }
    public DbSet<RiskProfile> RiskProfiles { get; set; }
    public DbSet<RemediationStep> RemediationStep { get; set; }
    public DbSet<MeetingMinute> MeetingMinutes { get; set; }
    public DbSet<EscalationMatrix> EscalationMatrices { get; set; }
    public DbSet<Sprint> Sprints { get; set; }
    public DbSet<ApplicationUser> Users { get; set; }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<PhaseMilestone>()
        .HasOne(p => p.Project)
        .WithMany()
        .HasForeignKey(p => p.ProjectId);
        builder.Entity<PhaseMilestone>()
        .HasMany(p => p.Sprints)    // Indicates that PhaseMilestone has many Sprints
        .WithOne(s => s.PhaseMilestone)  // Indicates that Sprint belongs to one PhaseMilestone
        .HasForeignKey(s => s.PhaseMilestoneId);

        /* Include modules to your migration db context */

        builder.ConfigurePermissionManagement();
        builder.ConfigureSettingManagement();
        builder.ConfigureAuditLogging();
        builder.ConfigureIdentity();
        builder.ConfigureOpenIddict();
        builder.ConfigureFeatureManagement();
        builder.ConfigureTenantManagement();

        /* Configure your own entities here */
        builder.Entity<DocumentVersion>(entity =>
        {
            entity.ConfigureByConvention();
        });
        builder.Entity<EscalationMatrix>(EscalationMatrix =>
        {
            EscalationMatrix.ConfigureByConvention();
        });
        builder.Entity<MeetingMinute>(MeetingMinute =>
        {
            MeetingMinute.ConfigureByConvention();
        });
        builder.Entity<Organization>(Organization =>
        {
            Organization.ConfigureByConvention();
        });
        builder.Entity<Project>(Project =>
        {
            Project.ConfigureByConvention();
        });
        builder.Entity<ProjectBudget>(ProjectBudget =>
        {
            ProjectBudget.ConfigureByConvention();
        });
        builder.Entity<VersionHistory>(VersionHistory =>
        {
            VersionHistory.ConfigureByConvention();
        });
        builder.Entity<AuditHistory>(AuditHistory =>
        {
            AuditHistory.ConfigureByConvention();
        });
        builder.Entity<ProjectDescription>(ProjectDescription =>
        {
            ProjectDescription.ConfigureByConvention();
        });
        builder.Entity<Scope>(Scope =>
        {
            Scope.ConfigureByConvention();
        });
        builder.Entity<ProjectStack>(ProjectStack =>
        {
            ProjectStack.ConfigureByConvention();
        });
        builder.Entity<ProjectResources>(ProjectResources =>
        {
            ProjectResources.ConfigureByConvention();
        });
        builder.Entity<RiskProfile>(RiskProfile =>
        {
            RiskProfile.ConfigureByConvention();
        });
        builder.Entity<RemediationStep>(RemediationStep =>
        {
            RemediationStep.ConfigureByConvention();
        });
        builder.Entity<Sprint>(Sprint =>
        {
            Sprint.ConfigureByConvention();
        });
        builder.Entity<PhaseMilestone>(PhaseMilestone =>
        {
            PhaseMilestone.ConfigureByConvention();
        });
        builder.Entity<ClientFeedback>(ClientFeedback =>
        {
            ClientFeedback.ConfigureByConvention();
        });
        builder.Entity<Document>(Document =>
        {
            Document.ConfigureByConvention();
        });
        builder.Entity<ApplicationUser>(ApplicationUser =>
        {
            ApplicationUser.ConfigureByConvention();
        });

    }
}
